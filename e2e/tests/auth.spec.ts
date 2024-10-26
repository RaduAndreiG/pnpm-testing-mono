import { test, expect } from './fixtures/auth.fixture'
import { MainPage } from './pages/mainPage.page'

test.describe('auth', () => {

	// Your tests will go here
	test('should redirect unauthorized user to the login page', async ({ page }) => {
		await page.goto('http://localhost:5173/')
		await expect(page).toHaveURL('http://localhost:5173/login')
	})

	test('should warn you if your login is incorrect', async ({
		page,
		loginPage
	}) => {

		await loginPage.populateForm('incorrect', 'password')

		await page.click('#login')
		await expect(page.getByText('Account not found.')).toBeVisible()

	})

	test('should warn you if your form is empty', async ({
		page,
		loginPage
	}) => {
		await loginPage.page.click('#login')
		await expect(page.getByText('Please enter a username and password')).toBeVisible()
	})

	test('should redirect to the home page when a new account is created', async ({
		user_credentials,
		loginPage,
		storage,
		page
	}) => {
		const mainPage = new MainPage(page)

		await loginPage.populateForm(
			user_credentials.username,
			user_credentials.password
		)
		await page.click('#signup')
		await page.waitForLoadState('load')

		await mainPage.waitforpage()

		const localStorage = await storage.localStorage

		expect(localStorage).toHaveProperty('quoots-user')

		await expect(page).toHaveURL('http://localhost:5173')
	})

})
