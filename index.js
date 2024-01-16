import { CronJob } from "cron";
import { botAbsensi } from "./bot.js";
import dotenv from 'dotenv'
dotenv.config();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log()

const menit_datang = getRandomInt(0,30).toString();
const jam_datang = '8';
const hari_datang = "1-5";

const menit_pulang = getRandomInt(0,30).toString();
const jam_pulang = '16';
const hari_pulang = "1-5";

const jobAbsenDatang = CronJob.from({
  cronTime: `0 ${menit_datang} ${jam_datang} * * ${hari_datang}`,
  onTick: ()=> botAbsensi(process.env.URL, process.env.EMAIL_USER, process.env.PASSWORD_USER, true),
  start: true,
  timeZone: "Asia/Jakarta",
});

jobAbsenDatang.start();

const jobAbsenPulang = CronJob.from({
  cronTime: `0 ${menit_pulang} ${jam_pulang} * * ${hari_pulang}`,
  onTick: ()=>botAbsensi(process.env.URL, process.env.EMAIL_USER, process.env.PASSWORD_USER, true),
  start: true,
  timeZone: "Asia/Jakarta",
});

jobAbsenPulang.start();
