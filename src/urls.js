const urls = {
    REGISTER_URL: function() { return 'register/' },
    LOGIN_URL: function() { return 'token-auth/' },
    GROUPS_URL: function() { return 'groups/' },
    SUBJECT_URL: function() { return 'subjects/' },
    TESTS_URL: function(lectureId = '', labId = '') { return `tests/?lab=${labId}&lecture=${lectureId}` },
    TEST_DETAIL_URL: function(id) { return `tests/${id}` },
    CONNECT_URL: function() { return 'connect/' },
    DISCONNECT_URL: function() { return 'disconnect/' },
    EXEC_COMMAND: function(id) { return `exec-command/?id=${id}` },
    DEVICES_URL: function() { return 'devices/' },
    COMMANDS_URL: function(search) { return `commands?search=${search}` },
    CREATE_TEACHER: function() { return `create-teacher/` },
    SUBJECT_DETAIL_URL: function(subj_id) { return `subjects/${subj_id}` },
    FOLDERS_URL: function(sem_id) { return `folders?semester=${sem_id}` },
    FILES_URL: function(fold_id) { return `files?folder=${fold_id}` },
    LECTURES_URL: function(semId) { return `lectures?semester=${semId}` },
    LABS_URL: function(semId) { return `labs?semester=${semId}` },
    TEST_RESULTS_URL: function(testId = '', groupId = '', studentId = '') { return `tests-results?test=${testId}&student__group=${groupId}&student=${studentId}` },
    TEST_RESULT_URL: function(id) { return `tests-results/${id}` },
    STUDENTS_URL: function(id = '') { return `users?group=${id}&role=1` },
    SEMESTERS_URL: function(subj_id) { return `semesters?subject=${subj_id}` }
}

urls.install = function(Vue) {
    Vue.prototype.$getConst = (key) => {
        return urls[key];
    }
};
export default urls;