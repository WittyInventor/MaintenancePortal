function submitRequest(obj) {
  const btn = $(obj);
  console.log("btn: ", btn);

  const categorymaintenance = $("#request-category-maintenance").val();
  const description = $("#request-description").val();
  const permissiontoenter = $("#request-permission-to-enter").val();
  const alarmcode = $("#request-alarm-code").val();
  const entrynotes = $("#request-entry-notes").val();
  const imageFile = document.getElementById("request-image").files[0];
  const image = imageFile ? "/images/"+imageFile.name : null;
  if (imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch("/api/requests/image", {
      method: "POST",
      body: formData,
    }).then(() => {});
  }

  // Send the PUT request.
  fetch("/api/requests/", {
    method: "POST",
    body: JSON.stringify({
      categorymaintenance,
      description,
      permissiontoenter,
      alarmcode,
      entrynotes,
      image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // document.location.replace("/workorders");
    alert("Request created successfully");
    document.location.replace("/requests");
  });
}

function changeStatus(request, newStatus) {
  fetch(`/api/requests/${request}`, {
    method: "PUT",
    body: JSON.stringify({
      status: newStatus,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    if (newStatus === "Accepted") {
      alert("Request " + request + " Accepted. Work Order created");
    }
    location.reload();
  });
}

function acceptRequest(obj) {
  const btn = $(obj);
  console.log("btn: ", btn);
  const request = btn.attr("data-id");
  console.log("Request: ", request);
  changeStatus(request, "Accepted");
}

function rejectRequest(obj) {
  const btn = $(obj);
  console.log("btn: ", btn);
  const request = btn.attr("data-id");
  console.log("Request: ", request);
  changeStatus(request, "Rejected");
}

// addButtonListeners();
