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
    document.location.replace("/requests");
  });
}

function changeStatus(request,newStatus){
  fetch(`/api/requests/${request}`, {
    method: "PUT",
    body: JSON.stringify({
      status: newStatus
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    if(newStatus === "Accepted"){
      alert("Request " + request + " Accepted. Work Order created");
    }
    location.reload();
  });
}

function acceptRequest(obj){
  const btn = $(obj);
  console.log("btn: ", btn);
  const request = btn.attr("data-id");
  console.log("Request: ", request);
  changeStatus(request,"Accepted");
}

function rejectRequest(obj){
  const btn = $(obj);
  console.log("btn: ", btn);
  const request = btn.attr("data-id");
  console.log("Request: ", request);
  changeStatus(request,"Rejected");
}

// addButtonListeners();
