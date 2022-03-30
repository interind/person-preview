<template>
  <header class="header">
    <div class="header__content">
      <router-link class="logo" to="/" />
      <nav class="main-nav header__center">
        <ul class="main-nav__list">
          <li class="main-nav__item">
            <router-link
              class="main-nav__link"
              active-class="main-nav__link_active"
              to="/">
                Форма
              </router-link>
          </li>
          <li class="main-nav__item">
            <router-link
              class="main-nav__link"
              active-class="main-nav__link_active"
              to="/preview">
                Превью
              </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view/>
  <footer class="footer">
    <p class="footer__text">all rights reserved</p>
  </footer>
</template>
