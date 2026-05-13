import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.contoller.js";

import { getMessages, sendMessage, deleteMessage } from "../controllers/message.contoller.js";
const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);
router.delete("/:id",protectRoute,deleteMessage);

export default router;