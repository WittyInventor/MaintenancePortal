function saveWorkOrder(obj) {
  // $(".wo-save").on("click", () => {
  // Get element
  // const btn = $(this);
  const btn = $(obj);
  console.log("btn: ", btn);
  const workorder = btn.attr("data-id");

  // Get level of urgency
  const urgency = $("#wo-urgency-"+workorder +" :selected").text();
  const assignedTo = $("#wo-assigned-to-"+workorder).val();
  console.log("assignedTo: ",  $("#wo-assigned-to-"+workorder));
  const notes = $("#wo-notes-"+workorder).val();
  const status = $("#wo-status-"+workorder+" :selected").val();
  const invoice = $("#wo-invoice-"+workorder).val();
  const invoicevalue = $("#wo-invoice-amount-"+workorder).val();

  console.log("Save button clicked " + workorder);
  console.log(
    urgency,
    assignedTo,
    notes,
    "status: "+status,
    invoice,
    invoicevalue,
    workorder
  );
  // Send the PUT request.
  fetch(`/api/workorders/${workorder}`, {
    method: "PUT",
    body: JSON.stringify({
      urgency,
      assignedTo,
      notes,
      status,
      invoice,
      invoicevalue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // document.location.replace("/workorders");
    alert("Work Order " + workorder + " Updated");
  });
}

// addButtonListeners();
