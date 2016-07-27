function User(id, name) {
    this.id = id || -1;
    this.name = name || ('user(' + id + ')');
}

module.exports = User;