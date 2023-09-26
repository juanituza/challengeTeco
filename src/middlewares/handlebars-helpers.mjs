export function ifRoleIsPremiumOrAdmin(userRole, options) {
  if (userRole === "premium" || userRole === "ADMIN") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
export function ifRoleIsPremiumOrUser(userRole, options) {
  if (userRole === "user" || userRole === "premium") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}

export function ifRoleAdmin(userRole, options) {
  if (userRole === "ADMIN") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
