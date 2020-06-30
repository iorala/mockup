(function($) {
    var DSpace = window.DSpace || {context_path: ''};
    $.getJSON(DSpace.context_path + '/JSON/mqm/i18n', undefined, function(
        json
    ) {
        var i18n = {};
        $.extend(i18n, $(document).data('i18n'), json);
        $(document).data('i18n', i18n);
    });

    function getMessage(key, defaultMessage) {
        return $(document).data('i18n')[key] || defaultMessage;
    }

    $(document).ready(function() {
        $(
            '.submission .duplicateCheckerDouble button[name^=create-version-from]'
        ).click(function(e) {
            e.preventDefault();
            var confirmMessage = getMessage(
                'SubmissionDuplicateMergeWarning',
                'When this item is merged with another item, this item will be deleted.\n' +
                    'Workflow items that are merged by reviewers are not deleted. They will be rejected automatically instead.'
            );
            if (window.confirm(confirmMessage)) {
                var targetId = $(this)
                    .attr('name')
                    .substring('create-version-from-'.length);
                var itemId = $('input[name=item-id]').val();
                document.location =
                    document.location.protocol +
                    '//' +
                    (document.location.host + '/' + DSpace.context_path) +
                    '/atmire/metadata-quality/duplicate-checker?' +
                    ('initialItemID=' + itemId) +
                    ('&mergeItemID=' + targetId) +
                    ('&initiator=submission');
            }
        });
    });
})(jQuery);
