const users = {1203897459874: {username: jpa399, pic: './images/profilepic.jpg', recordSteps: 30000, avgSteps: 10000},
239847502983448: {username: ashih, pic: './images/alexpic.jpg', recordSteps: 10, avgSteps: 2}};

getUsername = (publicKey) => {
    return users.forEach((user) => {
        if (user === publicKey) {
            return user.username;
        }
    });
}