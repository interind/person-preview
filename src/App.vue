<template>
  <header class="header">
    <div class="header__content">
      <router-link class="logo logo__header" to="/" />
      <nav class="main-nav header__center">
        <ul class="main-nav__list">
          <li class="main-nav__item">
            <router-link
              class="main-nav__link"
              active-class="main-nav__link_active"
              to="/"
            >
                Форма
              </router-link>
          </li>
          <li class="main-nav__item">
            <router-link
              class="main-nav__link"
              active-class="main-nav__link_active"
              to="/preview"
            >
                Превью
              </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="content">
    <h1 class="content__title">
      Персональные данные
    </h1>
    <router-view/>
  </div>
  <footer class="footer">
    <p class="footer__text">all rights reserved</p>
  </footer>
</template>
