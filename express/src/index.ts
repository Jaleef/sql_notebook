import express, { Request, Response } from "express";
import cors from "cors";
import { pool, execute } from "./database";
import { QueryResult } from "mysql2";

const app = express();
const port = 9000;

app.use(express.json());

let isConnect = false;

app.use(cors());


app.get("/", (req: Request, res: Response) => {
	res.send(
		"Hello, TypeScript with Express! I want to learn more about TypeScript.",
	);
});


app.get("/connect", (req: Request, res: Response) => {
	if (!isConnect) {
		pool.connect((err) => {
			if (err) {
				return res.status(500).send(
					JSON.stringify({
						error: true,
						message: "连接数据库失败: " + err.message,
					}),
				);
			}
			isConnect = true;
			res.send(
				JSON.stringify({
					error: false,
					message: "连接数据库成功",
				}),
			);
		});
	} else {
		res.send(
			JSON.stringify({
				error: false,
				message: "已连接数据库",
			}),
		);
	}
});


app.get("/close", (req: Request, res: Response) => {
	if (isConnect) {
		pool.end((err) => {
			if (err) {
				return res.status(500).send(
					JSON.stringify({
						error: true,
						message: "关闭数据库失败: " + err.message,
					}),
				);
			}
			isConnect = false;
			res.send(
				JSON.stringify({
					error: false,
					message: "关闭数据库成功",
				}),
			);
		});
	}
});


process.on("SIGINT", () => {
	if (isConnect) {
		pool.end((err) => {
			if (err) {
				return console.error("关闭数据库失败: " + err.message);
			}
			isConnect = false;
		});
	}
	process.exit();
});

app.post("/query", async (req: Request, res: Response) => {
	try {
		const sqlQuery = req.body.query;
		console.log(sqlQuery);

    pool.query(sqlQuery, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("查询失败: " + err.message);
      }

      console.log(data);
      res.send({
        output: JSON.stringify(data),
      });
    })

	} catch (err) {
		console.error(err);
    res.send("syntax error");
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
