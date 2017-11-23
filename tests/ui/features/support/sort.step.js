<!-- BEGIN - Les tests -->
const Zombie = require('zombie');
this.browser = new Zombie({site : 'http://localhost:3000'});
const { Given , Then , When } = require('cucumber');
const  expect = require('chai');
const  assert = require('assert');

Given('SORT The contact list is display', function (callback) {
    this.browser.visit("http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        let tr = this.browser.queryAll('tr')[0].cells;
        assert(tr[0].textContent, "First name");
        assert(tr[1].textContent, "Last name");

        let c = this.browser.tabs.current.Contact, iterator = c.Contacts.instance().iterator(), i = 0;
        while (iterator.hasNext()) {
            let contact = iterator.next();
            assert(this.browser.queryAll('td#cellFirstName')[i].innerHTML, contact.firstName(), "Contact" + i + "First name OK");
            assert(this.browser.queryAll('td#cellLastName')[i].innerHTML, contact.lastName(), "Contact" + i + "Last name OK");
            i++;
        }
        callback();
    });
});

When('User clicks on sort button', function (callback) {
    this.browser.query('a#button_sort').click();
    callback();
});

Then('The list is alphabetically sorted', function (callback) {
    let arr = [], c = this.browser.tabs.current.Contact;
    let iterator = c.Contacts.instance().iterator();
    while (iterator.hasNext()) {
        let contact = iterator.next();
        arr.push(contact.lastName());
    }

    let sortedArr = arr.sort();

    assert(this.browser.queryAll('td#cellLastName')[0].innerHTML, sortedArr[0]);
    assert(this.browser.queryAll('td#cellLastName')[1].innerHTML, sortedArr[1]);
    assert(this.browser.queryAll('td#cellLastName')[2].innerHTML, sortedArr[2]);
    callback();
});