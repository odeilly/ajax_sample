(($) => {
	
	$(window).on("load", () => {
		
		$("[name=button-get-sample-person]").on("click", (event) => {
			const $target = $(event.currentTarget).prop("disabled", true);
			const $resultArea = $("#result-get-sample-person").empty().hide();
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
				$resultArea.append(resultHtml);
			})
			.always(() => {
				$resultArea.show();
				$target.prop("disabled", false)
			});
			return false;
		});
	});
})(jQuery)
