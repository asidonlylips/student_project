const urls = {
    REGISTER_URL: function() { return 'regiser/' },
    LOGIN_URL: function() { return 'token-auth/' },
    SUBJECT_URL: function() { return 'subjects/' },
    SUBJECT_DETAIL_URL: function(subj_id) { return `subjects/${subj_id}` },
    FOLDERS_URL: function(sem_id) { return `folders?semester=${sem_id}` },
    FILES_URL: function(fold_id) { return `files?folder=${fold_id}` },
    SEMESTERS_URL: function(subj_id) { return `semesters?subject=${subj_id}` }
}

urls.install = function(Vue) {
    Vue.prototype.$getConst = (key) => {
        return urls[key];
    }
};
export default urls;