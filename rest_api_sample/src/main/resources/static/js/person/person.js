(($) => {
	
	$(window).on("load", () => {
		
		$("[name=button-get-sample-person]").on("click", () => {
			$("[name=button-get-sample-person]").prop("disabled", true);
			$("#result-get-sample-person").empty().hide();
			$.ajax({
				url: $("#url-get-sample-person").attr("action")
			})
			.done((response) => {
				console.log(response);
				const person = JSON.parse(JSON.stringify(response));
				const resultHtml = `
					<dl>
						<dt>ID</dt>
						<dd>${person.id}</dd>
						<dt>Name</dt>
						<dd>${person.name}</dd>
						<dt>Age</dt>
						<dd>${person.age}</dd>
					</dl>
				`;
				$("#result-get-sample-person").append(resultHtml);
			})
			.always(() => {
				$("#result-get-sample-person").show();
				$("[name=button-get-sample-person]").prop("disabled", false)
			});
			return false;
		});
	});
})(jQuery)
