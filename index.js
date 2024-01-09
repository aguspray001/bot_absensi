import { CronJob } from "cron";
import { botAbsensi } from "./bot.js";
import dotenv from 'dotenv'
dotenv.config()

const d = new Date();
let current_minutes = d.getMinutes();

const menit_datang = current_minutes;
const jam_datang = '7';
const hari_datang = "1-5";

const menit_pulang = current_minutes;
const jam_pulang = '16';
const hari_pulang = "1-5";

const jobAbsenDatang = CronJob.from({
  cronTime: `0 ${menit_datang} ${jam_datang} * * ${hari_datang}`,
  onTick: ()=>botAbsensi(process.env.URL, process.env.EMAIL_USER, process.env.PASSWORD_USER, true),
  start: true,
  timeZone: "Asia/Jakarta",
});

jobAbsenDatang.start();

const jobAbsenPulang = CronJob.from({
  cronTime: `0 ${menit_pulang} ${jam_pulang} * * ${hari_pulang}`,
  onTick: botAbsensi(process.env.URL, process.env.EMAIL_USER, process.env.PASSWORD_USER, true),
  start: true,
  timeZone: "Asia/Jakarta",
});

jobAbsenPulang.start();
