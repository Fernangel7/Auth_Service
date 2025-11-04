class user_controller {
    static async user_auth(req, res) {
        console.log(200)
        return res.status(200).json({ status: 200, message: "correct authentication..." })
    }
}

module.exports = {
    user_controller
}