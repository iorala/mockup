(function ($) {

    $(document).ready(function () {
        addUseParentButtons();
        itemViewQueueLink();
    });

    /**
     * "Select default" buttons (permission forms)
     */
    function addUseParentButtons() {
        var useParentPrefix = 'ds2-use-parent_';
        var elements = $('[class*="' + useParentPrefix + '"]');
        $.each(elements, function (indexElement, element) {
            var classList = $(element).attr('class').split(/\s+/);
            $.each(classList, function (indexClass, className) {
                if (className.indexOf('ds2-use-parent') == 0) {
                    var parentValue = className.substring(useParentPrefix.length);
                    addUseParentButton(element, parentValue);
                }
            });
        });
    }

    function addUseParentButton(element, parentValue) {
        var buttonLabel = 'Select default';
        var $element = $(element);
        var valueInput = $('input[value=' + parentValue + ']', $element);
        var button = $('<button class="btn btn-default">');
        button.text(buttonLabel + ' (' + valueInput.parent().text().trim() + ')');
        $element.append(button);

        button.click(function (e) {
            e.preventDefault();
            valueInput.prop('checked', true);
        });
    }

    function itemViewQueueLink() {
        $('a[ds2-queue-link]').each(function (i, element) {
            var $element = $(element);
            var queueTarget = $element.attr('ds2-queue-link');
            var isQueued = $element.attr('ds2-is-queued') === 'yes';
            var fileName = $element.text();

            function setAsQueued() {
                $element.replaceWith("<div>" + fileName + ": queued for conversion</div>");
            }

            if (isQueued) {
                setAsQueued();
            } else {
                $element.html(fileName + ": queue for streaming");
                $element.click(function (e) {
                    e.preventDefault();
                    $.ajax(queueTarget);
                    setAsQueued();
                });
            }
        });
    }

})(jQuery);