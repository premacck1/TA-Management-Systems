import {element, by, browser, protractor} from "protractor";

describe('Manager Page', () => {

    let EC = protractor.ExpectedConditions;

    beforeEach(() => {
        browser.get('/');
        element(by.css('.third-element')).click();
        browser.sleep(500);
        element(by.id('okButton')).click();
        browser.sleep(500);
    });

   it('should display manager home page', () => {
        expect(element(by.css('.middle')).isPresent()).toBe(true);
        expect(element(by.css('.header-name')).getText()).toEqual('Welcome Manager');
    });

    it('should have course list', () => {
        let courses = element.all(by.id('courses'));
        expect(courses).toBeTruthy();
        expect(courses.count()).toEqual(5)
    });

    it('should display course details', () => {
        let courses = element.all(by.id('courses'));
        expect(courses).toBeTruthy();
        expect(courses.count()).toEqual(5);

        for (let i = 0; i < 5; i++){
            let course = courses.get(i);
            let courseCard = course.element(by.id('course-card'));
            expect(courseCard).toBeTruthy();
            browser.executeScript(function (elem) { elem.click(); }, courseCard.getWebElement());
            browser.sleep(1000);
            expect(course.element(by.id('side-course-name')).getText()).toEqual(element(by.id('course-name')).getText())
        }
    });

    it('should display student list', () => {
        let studentsTab = element(by.id('md-tab-label-0-1')); // this id is generated by Angular at runtime
        expect(studentsTab).toBeTruthy();
        browser.executeScript(function (elem) { elem.click(); }, studentsTab.getWebElement());
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(12);
    });

    it('should search student', () => {
        let studentsTab = element(by.id('md-tab-label-0-1')); // this id is generated by Angular at runtime
        expect(studentsTab).toBeTruthy();
        browser.executeScript(function (elem) { elem.click(); }, studentsTab.getWebElement());
        browser.sleep(1000);
        let search = element(by.name('search-input'));
        search.sendKeys('Anna');
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(1);
        let studentName = element(by.css('.student-name'));
        expect(studentName).toBeTruthy();
        expect(studentName.getText()).toContain('Anna');
        browser.sleep(1000);
    });

    it('should allow and reject students', () => {
        let studentsTab = element(by.id('md-tab-label-0-1')); // this id is generated by Angular at runtime
        expect(studentsTab).toBeTruthy();
        browser.executeScript(function (elem) { elem.click(); }, studentsTab.getWebElement());
        browser.sleep(1000);

        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(12);

        for (let i = 0; i < 5; i++){
            let studentStatus = students.get(i).element(by.id('change-status-btn'));
            expect(studentStatus).toBeTruthy();
            expect(studentStatus.isEnabled()).toBe(true);
            expect(studentStatus.getText()).toBe('Reject');
            browser.executeScript(function (elem) { elem.click(); }, studentStatus.getWebElement());
            // studentStatus.click();
            browser.sleep(1000);
            expect(studentStatus.getText()).toBe('Allow');
            // studentStatus.click();
            browser.executeScript(function (elem) { elem.click(); }, studentStatus.getWebElement());
        }
    });

});

