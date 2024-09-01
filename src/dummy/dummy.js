var users = [
  {
    email: "hello@world.com",
    username: "helloworld",
    contactno: "0011223344",
    password: "123456",
    confirmpassword: "123456",
  },
];

export const AddUser = (user) => {
  users.push(user);
  // console.log(users);
};

export const CheckUser = (userToAuth) => {
  // console.log("authorizing");

  const filteredUsers = users.filter(
    (user) =>
      user.email === userToAuth.username ||
      user.username === userToAuth.username
  );

  if (filteredUsers.length === 0) {
    // console.log("Username doesnt exist");
    return null;
  }

  const user = filteredUsers[0];

  if (user.password === userToAuth.password) {
    // console.log("authorized");
    return user;
  } else {
    // console.log("Password is not matching");
    return null;
  }
};

var admins = [
  {
    email: "admin@lisa.com",
    username: "adminlisa",
    password: "123456",
  },
];

export const CheckAdmin = (adminToAuth) => {
  // console.log("authorizing");

  const filteredAdmins = admins.filter(
    (user) =>
      user.email === adminToAuth.username ||
      user.username === adminToAuth.username
  );

  if (filteredAdmins.length === 0) {
    // console.log("Username doesnt exist");
    return null;
  }

  const admin = filteredAdmins[0];

  if (admin.password === adminToAuth.password) {
    // console.log("authorized");
    return admin;
  } else {
    // console.log("Password is not matching");
    return null;
  }
};
