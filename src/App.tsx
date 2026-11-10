/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuPage } from './components/MenuPage';

export default function App() {
  const [menuPageOpen, setMenuPageOpen] = useState(false);

  // Check URL hash on load / change
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#menu-page' || window.location.hash === '#full-menu') {
        setMenuPageOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Global click interception
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Menu page triggers
      const menuPageTrigger = target.closest('[data-open-menu-page], a[href="#menu-page"], a[href="#full-menu"]');
      if (menuPageTrigger) {
        e.preventDefault();
        setMenuPageOpen(true);
        return;
      }

      // Smooth scroll navigation
      const navLink = target.closest('a[href^="#"]');
      if (navLink) {
        const hash = (navLink as HTMLAnchorElement).getAttribute('href');
        if (hash && hash !== '#') {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
            if (navMenu) {
              navMenu.classList.remove('is-opened');
              (navMenu as HTMLElement).style.display = '';
            }
          }
        }
      }

      // Mobile hamburger button
      const mobileNavBtn = target.closest('.mobile-nav-button');
      if (mobileNavBtn) {
        const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
        if (navMenu) {
          const isOpened = navMenu.classList.contains('is-opened');
          if (isOpened) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = 'none';
          } else {
            navMenu.classList.add('is-opened');
            (navMenu as HTMLElement).style.display = 'block';
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Ensure all Webflow animation triggers reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-w-id]').forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.opacity === '0') {
        observer.observe(htmlEl);
      }
    });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* DEDICATED MENU PAGE OVERLAY */}
      <MenuPage
        isOpen={menuPageOpen}
        onClose={() => setMenuPageOpen(false)}
      />
    </>
  );
}
