const images = document.querySelectorAll(".image");
const menu = document.querySelector(".menu_mobile");
function openMenu() {
    menu.style.display = "block";
}
function closeMenu() {
    menu.style.display = "none";
}
images.forEach((image) => {
    image.addEventListener("click", () => {
        const videoId = image.getAttribute("data-id");
        const url_video = `https://www.youtube.com/embed/${videoId}`;
        document.querySelector("iframe").src = url_video;
    });
});

async function getData() {
    try {
        const response = await fetch("https://quickshow-server.vercel.app/api/show/all"); // Gửi yêu cầu GET
        if (!response.ok) throw new Error("Lỗi mạng hoặc API"); // Kiểm tra lỗi
        const data = await response.json(); // Chuyển phản hồi thành JSON
        console.log(data); // Xử lý dữ liệu
    } catch (error) {
        console.error("Lỗi:", error.message); // Xử lý lỗi
    }
}
getData();
