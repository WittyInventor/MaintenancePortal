function submitRequest(obj) {
  // $(".wo-save").on("click", () => {
  // Get element
  // const btn = $(this);
  const btn = $(obj);
  console.log("btn: ", btn);

  const categorymaintenance = $("#request-category-maintenance").val();
  const description = $("#request-description").val();
  const permissiontoenter = $("#request-permission-to-enter").val();
  const alarmcode = $("#request-alarm-code").val();
  const entrynotes = $("#request-entry-notes").val();

  console.log("Save button clicked ");
  console.log(categorymaintenance, description, permissiontoenter, alarmcode, entrynotes)

  // Send the PUT request.
  fetch('/api/requests/', {
    method: "POST",
    body: JSON.stringify({
      categorymaintenance,
      description,
      permissiontoenter,
      alarmcode,
      entrynotes
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // document.location.replace("/workorders");
    alert("Request created successfully");
  });
}

// addButtonListeners();
