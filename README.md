# C:N Farmer App

English · 简体中文 · Bahasa Melayu

## Run on Windows
1. Clone this repository or download and extract its ZIP.
2. Double-click `Start-App.cmd` and keep its window open.
3. Open the address shown in that window (normally http://127.0.0.1:8840/).
4. Close the window or press Ctrl+C to stop the server.

The launcher uses Node.js or Python 3 already installed on the computer. On this Codex computer, it also checks the bundled Codex Node.js location. No npm packages, build step, account or database are required. Runtime executables are not included in the ZIP.

Do not double-click `dist/index.html`: JavaScript modules need a local HTTP server.

## Other systems / manual start
With Node.js 18 or later:

    node server.mjs

Or with Python 3:

    python -m http.server 8840 --bind 127.0.0.1 --directory dist

For a different Node server port:

    node server.mjs 8842

Then open the printed URL. The server only accepts connections from this computer.

## What is included
- `dist/`: complete buildless application source and assets, including all three languages, lessons, sources and crop profiles.
- `server.mjs`: dependency-free local static server.
- `Start-App.cmd`: Windows launcher.
- `check*.mjs`: source, translation, decision and arithmetic checks. Run each with `node filename.mjs`.

To host independently, upload the contents of `dist/` to a static web host that serves `.mjs` files as JavaScript. No server secrets are needed. The supplied local server is intended for local use.

## Scope and data
The detailed durian workflow covers nine farmer situations and 19 management priorities. Other crop profiles retain their existing, more general guidance. Software checks do not constitute field validation. Evidence and limitations are available inline in the app.

Lessons and guidance work without an internet connection after the local server starts. Original external research links require internet access. Progress and saved actions are stored in the current browser; they are not included in this repository and do not transfer automatically to another browser, port or hosted domain. The optional nitrogen worksheet calculates fertilizer nitrogen input, not plant tissue C:N.

## 中文：本机运行
解压整个 ZIP，双击 `Start-App.cmd`，保持窗口开启，然后打开窗口显示的网址。需要已安装的 Node.js 或 Python 3；启动器也会检查本机 Codex 自带的 Node.js。无需安装 npm 依赖或数据库。不要直接双击 HTML 文件。关闭窗口或按 Ctrl+C 即可停止。

课程和指导可离线使用；原始研究链接需要联网。学习进度与行动保存在当前浏览器，不会随源代码 自动转移。榴莲有深入的决策流程，其余作物目前保留较通用的指导。

## Bahasa Melayu: jalankan pada komputer
Ekstrak seluruh ZIP, klik dua kali `Start-App.cmd`, biarkan tetingkap terbuka dan buka alamat yang dipaparkan. Node.js atau Python 3 diperlukan; pelancar juga menyemak Node.js yang dibundel dengan Codex pada komputer ini. Tiada npm atau pangkalan data diperlukan. Jangan buka HTML secara terus. Tutup tetingkap atau tekan Ctrl+C untuk berhenti.

Pelajaran dan panduan boleh digunakan luar talian; pautan penyelidikan asal memerlukan internet. Kemajuan dan tindakan disimpan dalam pelayar semasa dan tidak dipindahkan secara automatik bersama kod sumber. Aliran keputusan terperinci tersedia untuk durian; tanaman lain mengekalkan panduan yang lebih umum.
