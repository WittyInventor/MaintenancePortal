function saveUser(obj) {
  try {
    const btn = $(obj);
    const id = btn.attr("data-id");
    const username = $("#username").val();
    const phoneinfo = $("#phoneinfo").val();
    const email = $("#email").val();
    const role = $("#role :selected").text();
    const isAdmin = $("#isAdmin").val();

    const data = {
      username,
      email,
      phoneinfo,
      role,
      isAdmin,
    };

    console.log("data", data);

    fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message === "success") {
          alert("User updated successfully");
          document.location.replace("/users");
        }
      });
  } catch (err) {
    console.log(err);
  }
}
