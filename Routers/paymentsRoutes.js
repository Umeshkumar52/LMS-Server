import { Router } from "express";
import islogined from '../midilewars/isLogined.js'
import { allPayments, createOrder, getrazorPayKey,Buysubscription,verifySubscription } from "../Controllers/paymentsController.js";
const router=Router()
router.route('/')
.get(getrazorPayKey)
router.route('/paymentVerify/:id')
.post(islogined,verifySubscription)
router.route('/order')
.post(createOrder)
router.route('/allPayouts')
.get(allPayments)
// router.route('/cretePlans')
// .post(createPlans)
router.route('/:id')
.post(islogined,Buysubscription)
export default router;