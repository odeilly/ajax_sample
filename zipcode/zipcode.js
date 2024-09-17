(($) => {
	$(window).on("load", () => {
		$("#search-button").on("click", (event) => {
			const target = $(event.currentTarget).prop("disabled", true);
			const resultsArea = $("#results").empty().hide();
			$.ajax({
				type: "GET",
				url: "https://zipcloud.ibsnet.co.jp/api/search",
				data: {
					zipcode: $('[name="zipcode"]').val(),
					limit: $('[name="limit"]').val()
				},
				datatype: "json"
			})
			.done((data) => {
				success(data, resultsArea);
				resultsArea.slideDown("slow");
				target.prop("disabled", false);
			})
			.fail(() => {
				console.log("error");
				target.prop("disabled", false);
			});
			return false;
		});

		const success = (data, resultsArea) => {
			console.log(data);
			const res = JSON.parse(data);
			if (res.status === 200) {
				if (!res.results) {
					resultsArea.append('<span class="error">該当住所なし。</span>');
					return;
				}
				resultsArea.append(`<div>検索件数：${res.results.length}</div>`);
				res.results.forEach((result) => {
					const table = `
						<table class="result">
							<tr>
								<th>zipcode</th>
								<td>${result.zipcode}</td>
							</tr>
							<tr>
								<th>prefcode</th>
								<td>${result.prefcode}</td>
							</tr>
							<tr>
								<th>address1</th>
								<td>${result.address1}</td>
							</tr>
							<tr>
								<th>address2</th>
								<td>${result.address2}</td>
							</tr>
							<tr>
								<th>address3</th>
								<td>${result.address3}</td>
							</tr>
							<tr>
								<th>kana1</th>
								<td>${result.kana1}</td>
							</tr>
							<tr>
								<th>kana2</th>
								<td>${result.kana2}</td>
							</tr>
							<tr>
								<th>kana3</th>
								<td>${result.kana3}</td>
							</tr>
						</table>`;
					resultsArea.append(table);
				});
			} else {
				resultsArea.append(`<span class="error">${res.message}</span>`);
			}
		}
	});
})(jQuery);
