<!-- BEGIN - Les tests -->
const Zombie = require('zombie');
this.browser = new Zombie({site : 'http://localhost:3000'});
const { Given , Then , When } = require('cucumber');
const  expect = require('chai');
const  assert = require('assert');

let apiBeforeDel, htmlBeforeDel;

Given('The contact list is display', function (callback) {
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

When('User clicks on remove button of the first contact', function (callback) {
    let c = this.browser.tabs.current.Contact, contact = c.Contacts.instance().iterator().next();
    apiBeforeDel = contact.firstName();
    htmlBeforeDel = this.browser.queryAll('td#cellFirstName')[0].innerHTML;
    this.browser.query('a#button_' + contact.id()).click();
    callback();
});

Then('The first contact is removed', function (callback) {
    let c = this.browser.tabs.current.Contact, contactAfterDel = c.Contacts.instance().iterator().next();
    let apiAfterDel = contactAfterDel.firstName();
    let htmlAfterDel = this.browser.queryAll('td#cellFirstName')[0].innerHTML;
    let ok = apiBeforeDel !== apiAfterDel && htmlBeforeDel !== htmlAfterDel;

    assert(ok, true, "Remove contact OK");
    callback();
});