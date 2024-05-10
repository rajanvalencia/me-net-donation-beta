import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  paymentIntentId : z.string(),
  
})



export async function POST(req:NextRequest) {
  // paymentMethod , paymentIntentId を受け取る。
  // stripe api に問い合わせ, payment Intent を確定
  // 成功　または　失敗のレスポンス

  // 各関係者に　寄付があったことを通知する

  // 寄付控除証明証を　生成し　、関係者(事務局)に送信

  // 領収証を寄付者にメールにて送る！

}