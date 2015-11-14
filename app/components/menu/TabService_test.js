(function() {
    "use strict";

    describe("Unit tests for menu service", function() {

        var tabService;
        var exampleTab1 = {
            name: 'name',
            content: 'someContent'
        };
        var exampleTab2 = {
            name: 'name2',
            content: 'someContent2'
        };

        beforeEach(module("ebikko.menu"));

        beforeEach(inject(function(_tabService_) {
            tabService = _tabService_;
        }));

        it("should add a new tab to the list and return it", function() {
            tabService.addTab(exampleTab1);

            expect(tabService.getTabs().length).toEqual(1);
            expect(tabService.getTabs()[0].name).toEqual('name');
            expect(tabService.getTabs()[0].content).toEqual('someContent');
        });

        it("should set selected menu item when adding tab", function() {
            tabService.addTab(exampleTab1);

            expect(tabService.getSelectedTab()).toEqual(exampleTab1);
        });

        it("should always add tab to the end, and filter out duplicates", function() {
            tabService.addTab(exampleTab1);
            tabService.addTab(exampleTab2);

            tabService.addTab(exampleTab1);

            expect(tabService.getSelectedTab()).toEqual(exampleTab1);
            expect(tabService.getTabs()[1]).toEqual(exampleTab1);
        });

        it("should always set the most recently added tab as the selected menu item", function() {
            tabService.addTab(exampleTab1);
            expect(tabService.getSelectedTab()).toEqual(exampleTab1);

            tabService.addTab(exampleTab2);
            expect(tabService.getSelectedTab()).toEqual(exampleTab2);
        });

        it("should not select the tab if it is currently selected", function() {
            tabService.addTab(exampleTab1);
            tabService.addTab(exampleTab2);

            tabService.selectTab(exampleTab1);

            expect(tabService.getSelectedTab()).toEqual(exampleTab1);
            expect(tabService.getTabs()[0]).toEqual(exampleTab1);
            expect(tabService.getTabs()[1]).toEqual(exampleTab2);
        });

        it("should not add the tab if it is currenctly selected", function() {
            tabService.addTab(exampleTab1);
            tabService.addTab(exampleTab2);
            tabService.selectTab(exampleTab1);

            tabService.addTab(exampleTab1);

            expect(tabService.getSelectedTab()).toEqual(exampleTab1);
            expect(tabService.getTabs()[0]).toEqual(exampleTab1);
            expect(tabService.getTabs()[1]).toEqual(exampleTab2);
        });
    })
})();