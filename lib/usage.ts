import { cookies } from "next/headers";
type Usage = { daily:number; monthly:number; dailyLimit:number; monthlyLimit:number; paused:boolean };
const DEFAULTS: Usage = { daily:0, monthly:0, dailyLimit:25, monthlyLimit:500, paused:false };
export function getUsage(): Usage { const c=cookies().get("mgi_usage")?.value; if(!c) return DEFAULTS; try{return {...DEFAULTS, ...JSON.parse(c)}}catch{return DEFAULTS} }
export function setUsage(p: Partial<Usage>){ const next={...getUsage(), ...p}; cookies().set("mgi_usage", JSON.stringify(next), { httpOnly:true, sameSite:"lax", path:"/" }); return next; }
export function canSend(){ const u=getUsage(); if(u.paused) return {ok:false,reason:"paused"}; if(u.daily>=u.dailyLimit) return {ok:false,reason:"daily"}; if(u.monthly>=u.monthlyLimit) return {ok:false,reason:"monthly"}; return {ok:true}; }
