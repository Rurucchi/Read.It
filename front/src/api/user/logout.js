export default function Logout() {
    localStorage.removeItem("token");
    return true;
}
