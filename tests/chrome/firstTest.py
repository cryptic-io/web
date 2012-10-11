from selenium import webdriver 
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.chrome.service as service

driver = webdriver.Chrome('./chromedriver')
driver.get('http://localhost/')
#search_box = driver.find_element_by_name('q')

WebDriverWait(driver, 10).until(lambda x: x.find_element_by_id('file-input'))


fileIn = driver.find_element_by_id('file-input')
fileIn.send_keys('/home/marco/code/crypticcandy/ccweb/tests/chrome/firstTest.py')

uploadButton  = driver.find_element_by_id('uploadFile')
uploadButton.click()

encryptedLink = driver.find_element_by_css_selector('#encryptedLink > textarea')

WebDriverWait(driver, 10).until(lambda x: encryptedLink.is_displayed())

print("encryptedLink:",encryptedLink.text)



#search_box.send_keys('ChromeDriver')

#search_box.submit()
#driver.quit();
