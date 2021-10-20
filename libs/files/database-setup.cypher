CREATE (:Language { tag: 'en-US', ownName: 'English', englishName: 'English' })
CREATE (:Language { tag: 'pl', ownName: 'polski', englishName: 'Polish' });

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  theme_select: 'Wybierz temat kolorystyczny',
  theme_dark: 'ciemny',
  theme_light: 'jasny'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  theme_select: 'Select theme',
  theme_dark: 'dark',
  theme_light: 'light'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations { menu_open: 'Otwórz', menu_close: 'Zamknij' })-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations { menu_open: 'Open', menu_close: 'Close' })-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations { page_title: 'Ewaluator ESE' })-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations { page_title: 'ESE evaluator' })-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations { language_select: 'Wybierz język' })-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations { language_select: 'Select language' })-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  not_found_img_title: 'Na łące widać 5 drzew oraz słońce. Zza drzew wystają dwa ludziki, które ewidentnie próbują się schować',
  not_found_title: 'Strona nie została znaleziona',
  not_found_desc: 'Strona mogła zostać skasowana, zmieniono jej adres albo została czasowo usunięta.',
  not_found_btn: 'Przejdź do strony głównej'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  not_found_img_title: 'A woods with 5 trees and sun. There are two little people looking from behind the trees and trying to hide',
  not_found_title: 'Page not found',
  not_found_desc: 'Page could be deleted, moved or is temporary unavailable.',
  not_found_btn: 'Go to home page'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  login_img_title: 'Ruda kobieta w garniturze trzyma pole formularza do wpisywania hasła. W tle widać drzewa.',
  login_title: 'Logowanie',
  login_email_label: 'Email',
  login_password_label: 'Hasło',
  login_submit: 'Zaloguj'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  login_img_title: 'A readhair woman in a suit holds password input. Trees can be seen in the background.',
  login_title: 'Login',
  login_email_label: 'Email',
  login_password_label: 'Password',
  login_submit: 'Log in'
})-[:OF]->(en);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  menu_login: 'Login',
  menu_register: 'Register',
  menu_logout: 'Logout',
  menu_me: 'My profile',
  menu_datasets: 'Datasets'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  menu_login: 'Logowanie',
  menu_register: 'Utwórz konto',
  menu_logout: 'Wyloguj',
  menu_me: 'Mój profil',
  menu_datasets: 'Zbiory danych'
})-[:OF]->(pl);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  toast_cannot_login: 'Nie udało się zalogować',
  toast_cannot_register: 'Nie udało się zarejestrować',
  toast_cannot_update_user: 'Nie udało się zaktualizować profilu',
  toast_cannot_access_public_part: 'Wylgouj się aby przejść do tej strony',
  toast_cannot_access_private_part: 'Nie masz dostępu do tego zasobu',
  toast_logout: 'Zostałeś(aś) wylogowany(a)',
  toast_upload_dataset: 'Przesyłamy Twój zbiór danych...',
  toast_upload_dataset_success: 'Zbiór danych przesłany poprawnie',
  toast_upload_dataset_fail: 'Nie udało się przesłać zbioru danych',
  toast_ok: 'ok'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  toast_cannot_login: 'Cannot log in',
  toast_cannot_register: 'Cannot register',
  toast_cannot_update_user: 'Cannot update profile',
  toast_cannot_access_public_part: 'Logout to access this page',
  toast_cannot_access_private_part: 'You have no access to this content',
  toast_logout: 'You have been logged out',
  toast_upload_dataset: 'Your dataset is uploading...',
  toast_upload_dataset_success: 'Your dataset was uploaded successfully',
  toast_upload_dataset_fail: 'The dataset could not be uploaded',
  toast_ok: 'ok'
})-[:OF]->(en);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  forms_required_error: 'Field is required',
  forms_email_error: 'Email is not valid',
  forms_username_error: 'Username is not valid',
  forms_password_error: 'Password is not valid',
  forms_match_passwords_error: 'Passwords do not match'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  forms_required_error: 'Pole jest wymagane',
  forms_email_error: 'Niepoprawny adres email',
  forms_username_error: 'Niepoprawna nazwa użytkownika',
  forms_password_error: 'Niepoprawne hasło',
  forms_match_passwords_error: 'Podano dwa różne hasła'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  register_img_title: 'There is a man sitting next to computer. He is waving friendly in your direction.',
  register_title: 'Registration',
  register_email_label: 'Email',
  register_username_label: 'Username',
  register_password_label: 'Password',
  register_repeat_password_label: 'Repeat password',
  register_submit: 'Register'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  register_img_title: 'Przy komputerze siedzi mężczyzna i macha przyjaźnie w Twoim kierunku',
  register_title: 'Rejestracja',
  register_email_label: 'Email',
  register_username_label: 'Nazwa użytkownika',
  register_password_label: 'Hasło',
  register_repeat_password_label: 'Powtórz hasło',
  register_submit: 'Utwórz konto'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  profile_display_email: 'Email: ',
  profile_display_edit: 'Edit',
  profile_edit_username: 'Username',
  profile_edit_organization: 'Organization',
  profile_edit_about: 'About',
  profile_edit_password: 'New password',
  profile_edit_repeat_password: 'Repeat password',
  profile_edit_save: 'Save',
  profile_edit_discard: 'Discard changes'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  profile_display_email: 'Email: ',
  profile_display_edit: 'Edytuj',
  profile_edit_username: 'Nazwa użytkownika',
  profile_edit_organization: 'Organizacja',
  profile_edit_about: 'O mnie',
  profile_edit_password: 'Nowe hasło',
  profile_edit_repeat_password: 'Powtórz hasło',
  profile_edit_save: 'Zapisz',
  profile_edit_discard: 'Porzuć zmiany'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  user_error_img_title: '',
  user_profile_img_title: '',
  user_cannot_find: 'Cannot find user'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  user_error_img_title: '',
  user_profile_img_title: '',
  user_cannot_find: 'Nie można znaleźć użytkownika'
})-[:OF]->(pl);

MATCH (en:Language { tag: 'en-US' }) WITH en
CREATE (:Translations {
  datasets_img_title: '',
  datasets_empty_img_title: '',
  datasets_title: 'Datasets',
  datasets_tab_all: 'All',
  datasets_tab_my: 'My',
  datasets_no_data: 'There are no datasets',
  datasets_add: 'Add dataset',
  datasets_upload: 'Upload dataset',
  datasets_name: 'Name',
  datasets_description: 'Description',
  datasets_choose: 'Choose File',
  datasets_send: 'Upload',
  datasets_search: 'Search',
  datasets_page: 'Page',
  datasets_invalid_page: 'Incorrext value, current page: {{ page }}'
})-[:OF]->(en);

MATCH (pl:Language { tag: 'pl' }) WITH pl
CREATE (:Translations {
  datasets_img_title: '',
  datasets_empty_img_title: '',
  datasets_title: 'Zbiory danych',
  datasets_tab_all: 'Wszystkie',
  datasets_tab_my: 'Moje',
  datasets_no_data: 'Nie znaleziono zbiorów danych',
  datasets_add: 'Dodaj zbiór danych',
  datasets_upload: 'Dodaj zbiór danych',
  datasets_name: 'Nazwa',
  datasets_description: 'Opis',
  datasets_choose: 'Wybierz plik',
  datasets_send: 'Wgraj',
  datasets_search: 'Szukaj',
  datasets_page: 'Strona',
  datasets_invalid_page: 'Niepoprawna strona, obecnie: {{ page }}'
})-[:OF]->(pl);
