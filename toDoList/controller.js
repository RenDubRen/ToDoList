;
(function () {
    'use strict';

    function start() {
        document.body.append(view.getRoot());

        model.dispatch = view.update;

        view.update(model.getItems());

        view.clickHandler = function (elementId, itemId) {
            if (elementId === 'clickByItem') {
                model.toggleChecked(itemId);
            } else if (elementId === 'addItem') {
                const value = view.getValue();

                if (value !== '') {
                    model.addItem(view.getValue());
                }

                view.setValue();
            } else if (elementId === 'makeDone') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.setDoneStatus(item.id, true);
                        model.toggleChecked(item.id);
                    }
                }
            } else if (elementId === 'makeNotDone') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.setDoneStatus(item.id, false);
                        model.toggleChecked(item.id);
                    }
                }
            } else if (elementId === 'remove') {
                const items = model.getItems();

                for (const item of items) {
                    if (item.checked) {
                        model.removeItem(item.id);
                    }
                }
            }

        };
    }

    window.controller = {
        start: start
    };

})();