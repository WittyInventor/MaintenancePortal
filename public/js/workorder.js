function saveWorkOrder(obj) {
  // $(".wo-save").on("click", () => {
  // Get element
  // const btn = $(this);
  const btn = $(obj);
  console.log("btn: ", btn);
  const workorder = btn.attr("data-id");

  // Get level of urgency
  const levelofurgency = $("#wo-urgency-"+workorder +" :selected").text();
  const assignedto = $("#wo-assigned-to-"+workorder + " :selected").text();
  console.log("assignedTo: ",  $("#wo-assigned-to-"+workorder));
  const notes = $("#wo-notes-"+workorder).val();
  const status = $("#wo-status-"+workorder+" :selected").val();
  const invoice = $("#wo-invoice-"+workorder).val();
  const invoiceamount = $("#wo-invoice-amount-"+workorder).val() || 0;

  // Send the PUT request.
  fetch(`/api/workorders/${workorder}`, {
    method: "PUT",
    body: JSON.stringify({
      levelofurgency,
      assignedto,
      notes,
      status,
      invoice,
      invoiceamount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // document.location.replace("/workorders");
    alert("Work Order " + workorder + " Updated");
    location.reload();
  });
}

// addButtonListeners();
