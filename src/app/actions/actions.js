"use server";

import { AddUser } from "@/dummy/dummy";

export async function registerUser(formData) {
  // console.log("Server action",formData);

  const rawForm = {
    email: formData.get("email"),
    username: formData.get("username"),
    contactno: formData.get("contactno"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
  };

  AddUser(rawForm);

  // console.log(rawForm);
}
