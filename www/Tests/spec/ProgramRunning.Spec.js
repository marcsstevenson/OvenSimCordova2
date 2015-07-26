/// <reference path="Lib/knockout-3.1.0.js" />
/// <reference path="../../Lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/jasmine-2.1.3/jasmine.js"/>
/// <reference path="../../OvenViewModel.js" />
/// <reference path="../../OvenScripts.js" />


describe("ProgramRunning", function () {
    var ovenViewModel;

    beforeEach(function () {
        ovenViewModel = new OvenViewModel(false, true, true, false); //soundEnabled, blinkingEnabled, defaultIsCelcius, timersEnabled
        ovenViewModel.LogFunction = null;
        ovenViewModel.TurnOvenOn();
    });
    
    //Display Program
    describe("With a program having a single infinite time stage", function () {
        beforeEach(function () {
            OvenScripts.Setup1StageProgram_150WithInfiniteTime_BackToHome(ovenViewModel);
        });

        describe("With the program selected", function () {
            beforeEach(function () {
                ovenViewModel.ProgramTap();
            });

            describe("With the oven preheated", function () {
                beforeEach(function () {
                    OvenScripts.SetActualTemperatureToTarget(ovenViewModel);
                });

                describe("With the program started", function () {
                    beforeEach(function () {
                        ovenViewModel.TimerButtonTap();
                    });

                    it("The timer display shall be 0", function () {
                        var display = ovenViewModel.BottomDisplay();
                        expect(display).toEqual('0:00');
                    });

                    describe("After 60 seconds", function () {
                        beforeEach(function () {
                            for (var i = 0; i < 60; i++) {
                                ovenViewModel.NextTimerCountdownInterval();
                            }
                        });

                        it("The timer display shall display 1 minute elapsed", function () {
                            var display = ovenViewModel.BottomDisplay();
                            expect(display).toEqual('1:00');
                        });
                    });
                });
            });
        });
    });
});

