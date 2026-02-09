---
trigger: always_on
---

NEVER EVER USE 
any type, eslint-disable
eslint-disable-next-line
eslint-disable-line
stylelint-disable
ts-ignore
ts-nocheck
ts-check
ts-expect-error , as unknown type or relative imports like ../file, only ./ - same folder allowed
never use @ts-expect-error or any ts-ignore etc, do not try to avoid anything related to skipping validation
