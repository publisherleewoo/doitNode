var form = {
    logoutBtn: function () {
        var template = `
        <form method="post" action="/api/logout">
        <input type="hidden" name="logout" value="logout">
        <input type="submit" value="로그아웃">
        </form>
        `
        return template
    }
}

module.exports = form