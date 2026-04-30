/**
 * 生产环境提示用户更新页面
 */

let oldHtml;

async function fetchHtml() {
    return await fetch(`/index.html?timestamp=${+new Date()}`).then((res) =>
        res.text()
    );
}

async function needUpdate() {
    const newHtml = await fetchHtml();
    let result = false;
    if (oldHtml && oldHtml !== newHtml) {
        result = true;
    }
    oldHtml = newHtml;
    return result;
}

function autoRefresh() {
    setTimeout(async () => {
        try {
            if (await needUpdate()) {
                const res = confirm("有新版本，点击确定更新");
                if (res) {
                    location.reload();
                }
            }
        } catch {
            // 网络异常时静默忽略
        }
        autoRefresh();
    }, 30000);
}

const env = import.meta.env.VITE_APP_DEV;
if (env !== "dev") {
    autoRefresh();
}
