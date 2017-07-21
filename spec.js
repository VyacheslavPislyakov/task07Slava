describe('big Scenario', function () {
	const URL = 'https://www.onliner.by/';
	let wantedElementFilterBrand = element(by.cssContainingText('div.schema-tags__item > span', 'Apple'));

	let wantedElementClickPhone6S = element(by.cssContainingText('span', 'Apple iPhone 6s Plus 16GB Space Gray'));
	let wantedElementClickPhoneSE = element(by.cssContainingText('span', 'Apple iPhone SE 16GB Space'));

	let wantedElementSelectedPhone6S = element(by.cssContainingText('h1', 'Смартфон Apple iPhone 6s Plus 16GB Space Gray'));
	let wantedElementSelectedPhoneSE = element(by.cssContainingText('h1', 'Смартфон Apple iPhone SE 16GB Space Gray'));

	let wantedElementOfYear = element(by.cssContainingText('div.schema-tags__item > span', '2016'));

	let elementMobilePhones = element.all(by.cssContainingText('span', 'Мобильные телефоны')).first();
	let elementBrandOfApple = element.all(by.cssContainingText('span', 'Apple')).first();
	let elementYear = element.all(by.cssContainingText('span', '2016')).first();
	let elementToComparePage = element.all(by.css('a.compare-button__sub.compare-button__sub_main')).first();
	let allCellsOfIphone6S = element.all(by.css('td:nth-child(3).product-table__cell.product-table__cell_accent'));
	let allCellsOfIphoneSE = element.all(by.css('td:nth-child(4).product-table__cell.product-table__cell_accent'));
	let buttonRemoveIphoneSe = element(by.css('#product-table > tbody:nth-child(2) > tr > th:nth-child(4) > div > a'));
	let removedPhone = element.all(by.cssContainingText('span', 'Apple iPhone SE 16GB Space Gray')).first();
	let elementOfCompare = element.all(by.css('a.compare-button__sub.compare-button__sub_main')).first();

	browser.waitForAngularEnabled(false);
	browser.get(URL);

	describe('Actions with phones', function () {
		it('click to mobile phone', function () {
			elementMobilePhones.click();
		});

		it('click to filter "Apple"', function () {
			elementBrandOfApple.click();
		});

		it('Should have been shown set filter "Apple"', function () {
			browser.wait(protractor.ExpectedConditions.visibilityOf(wantedElementFilterBrand), 5000);
		});

		it('Click to Apple iPhone 6S', function () {
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(wantedElementClickPhone6S), 5000);
			browser.executeScript("arguments[0].scrollIntoView();", wantedElementClickPhone6S);
			wantedElementClickPhone6S.click();
		});

		it('Should have been set Apple iPhone 6S', function () {
			browser.wait(protractor.ExpectedConditions.visibilityOf(wantedElementSelectedPhone6S), 5000);
		});

		it('Click to compare iPhone 6S', function () {
			element(by.cssContainingText('span', 'Добавить к сравнению')).click();
		});

		it('Should have been set compare', function () {
			// element(by.cssContainingText('a', '1 товар  в сравнении'));
			expect(elementOfCompare.getText()).toEqual('1 товар в сравнении');
		});

		it('Come back to mobile page', function () {
			browser.navigate().back();
		});

		it('Change filters click to "2016"', function () {
			browser.executeScript("arguments[0].scrollIntoView();", elementYear);
			elementYear.click();
		});
		it('Should have been shown set filter "2016"', function () {
			browser.wait(protractor.ExpectedConditions.visibilityOf(wantedElementOfYear), 5000);
			browser.executeScript("arguments[0].scrollIntoView();", wantedElementOfYear);
		});

		it('Click to Apple iPhone SE', function () {
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(wantedElementClickPhoneSE), 5000);
			browser.executeScript("arguments[0].scrollIntoView();", wantedElementClickPhoneSE);
			wantedElementClickPhoneSE.click();
		});

		it('Should have been set Apple iPhone SE', function () {
			browser.wait(protractor.ExpectedConditions.visibilityOf(wantedElementSelectedPhoneSE), 5000);
		});

		it('Click to compare second iPhone SE', function () {
			element(by.cssContainingText('span', 'Добавить к сравнению')).click();
		});

		it('Should have been set compare', function () {
			// element(by.cssContainingText('a', '2 товара  в сравнении'));
			expect(elementOfCompare.getText()).toEqual('2 товара в сравнении');
		});

		it('Going to compare page', function () {
			elementToComparePage.click();
		});

		it('Compare all functions of phones', function () {
			let advantages6S = 0;
			let advantagesSE = 0;
			browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
			allCellsOfIphone6S.count()
			.then(result => {
				advantages6S = result;
			})
			.then(() => {
				allCellsOfIphoneSE.count()
				.then(res => {
					advantagesSE = res;
				})
			})
			.then(() => {
				expect(advantages6S).toBeGreaterThan(advantagesSE);
			});
		});

		it('Delete iPhone SE', function () {
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(buttonRemoveIphoneSe), 5000);
			buttonRemoveIphoneSe.click();
		});

		it('Verify that "Apple iPhone SE 16GB Space Gray" has been removed', function () {
			browser.wait(protractor.ExpectedConditions.invisibilityOf(removedPhone));
		});
	});
})
