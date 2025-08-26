import express from 'express'
import { protectRoute } from '../middelwares/auth.middleware.js';
import { getRecommendedUsers, getMyFriends ,sendFriendRequest,acceptFriendRequest,getFirendRequests,getOutgoingFirendRequests} from '../controllers/user.controller.js';
const router=express.Router();

router.use(protectRoute)
router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);
router.post("/friend-request/:id",sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);
router.get('/friend-requests',getFirendRequests)
router.get("/outgoing-friend-requests",getOutgoingFirendRequests);

export default router;