(($) => {
	$(window).on("load", () => {

		const $resultsArea = $("#results");

		$("#search-button").on("click", (event) => {
			const $searchButton = $(event.currentTarget).prop("disabled", true);
			$resultsArea.empty().hide();
			$.ajax({
				type: "GET",
				url: "https://zipcloud.ibsnet.co.jp/api/search",
				data: {
					zipcode: $('[name="zipcode"]').val(),
					limit: $('[name="limit"]').val()
				},
				datatype: "json"
			})
			.done(success)
			.fail(error)
			.always(() => {
				$searchButton.prop("disabled", false);
				$resultsArea.slideDown("slow");
			});
			return false;
		});

		const success = (response) => {
			console.log(response);
			const data = JSON.parse(response);
			if (data.status !== 200) {
				$resultsArea.append(makeErrorElement(data.message));
				return;
			}
			if (!data.results) {
				$resultsArea.append(makeErrorElement("該当住所なし。"));
				return;
			}
			$resultsArea.append(`<div>検索件数：${data.results.length}</div>`);
			data.results.forEach((result) => {
				$resultsArea.append(makeResultElement(result));
			});
		}

		const error = () => {
			console.log("error");
			$resultsArea.append(makeErrorElement("エラーが発生しました。"));
		}

		const makeResultElement = (result) => {
			return `
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
		}

		const makeErrorElement = (message) => {
			return `<span class="error">${message}</span>`;
		}
	});
})(jQuery);
