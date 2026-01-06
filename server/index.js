import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";

import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.router.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

import path from "path";

const app = express();

// ✅ Allow multiple origins
const allowedOrigins = [

    "http://localhost:5173"
];

app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// ES module workaround for __dirname
const _dirname = path.resolve()

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on PORT ${PORT}`,
    });
});

// Serve static frontend (Vite build)
const staticPath = path.join(_dirname, "client", "dist");
app.use(express.static(staticPath));

// Fallback route for SPA (non-API)
 app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// ✅ Mount routers
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// ✅ Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});