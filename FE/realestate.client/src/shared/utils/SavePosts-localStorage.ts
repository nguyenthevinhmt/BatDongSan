if (typeof window !== "undefined" && !localStorage.getItem("SavePost")) {
  localStorage.setItem("SavePost", JSON.stringify([]));
}

// Function để lưu danh sách bài đăng yêu thích vào localStorage
export function addToFavorites(postId: any) {
  // Kiểm tra nếu localStorage đã có dữ liệu favorites
  if (typeof window !== "undefined") {
    const favorites = JSON.parse(localStorage.getItem("SavePost") ?? "[]");

    // Kiểm tra xem bài đăng đã được thêm vào favorites chưa
    if (!favorites.includes(postId)) {
      // Thêm bài đăng vào danh sách yêu thích
      favorites.push(postId);
      // Lưu lại danh sách yêu thích vào localStorage
      localStorage.setItem("SavePost", JSON.stringify(favorites));
    }
  }
}

// Function để xóa bài đăng khỏi danh sách yêu thích trong localStorage
export function removeFromFavorites(postId: any) {
  if (typeof window !== "undefined") {
    // Lấy danh sách favorites từ localStorage
    const favorites = JSON.parse(localStorage.getItem("SavePost") ?? "[]");
    // Kiểm tra xem bài đăng có trong danh sách yêu thích không
    const index = favorites.indexOf(postId);
    if (index !== -1) {
      // Xóa bài đăng khỏi danh sách yêu thích
      favorites.splice(index, 1);
      // Cập nhật lại localStorage
      localStorage.setItem("SavePost", JSON.stringify(favorites));
    }
  }
}

// Function để kiểm tra xem một bài đăng có trong danh sách yêu thích hay không
export function isFavorite(postId: any) {
  if (typeof window !== "undefined") {
    const favorites = JSON.parse(localStorage.getItem("SavePost") ?? "[]");
    return favorites.includes(postId);
  }
}

// Function để lấy danh sách bài đăng yêu thích từ localStorage
export function getFavorites() {
  if (typeof window !== "undefined") {
    const favoritesString = localStorage.getItem("SavePost"); // Lấy dữ liệu từ localStorage hoặc trả về chuỗi rỗng nếu không tồn tại
    return JSON.parse(favoritesString ?? "[]"); // Parse dữ liệu từ JSON string sang JavaScript object hoặc trả về mảng rỗng nếu dữ liệu không hợp lệ
  }
}
