describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginBth').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginBth').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'mluukkai',
        password: 'salainen'
      })

    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://test.com')
      cy.get('#createBtn').click()

      cy.get('.blogList').should('contain', 'test title test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test1',
          author: 'test2',
          url: 'test3'
        })
      })

      it('A blog can be liked', function () {
        cy.contains('test1').get('#trigger').click()
        cy.contains('test1').get('.likes').click()

        cy.get('html').should('contain', 'You liked test1 by test2')
      })

      it('A blog can be removed', function () {
        cy.contains('test1').get('#trigger').click()
        cy.contains('remove').click()

        cy.get('.success').should('contain', 'Blog test1 by test2 has removed')
      })
    })

    describe('and more blogs exist', function () {
      beforeEach(function () {
        [...Array(3)].map((e, idx) => {
          cy.createBlog({
            title: `test${idx}`,
            author: `test${idx}`,
            url: `test${idx}`
          })
        })
      })

      it('should be three blogs', function () {
        cy.get('.blogList>div').then(blogs => {
          expect(blogs.length).to.equal(3)
        })
      })

      it('press second blog likes button, that will be the first blog in bloglist', function () {
        cy.get('.blogList>div').then(blogs => {
          cy.wrap(blogs[1]).should('contain', 'test1')
          cy.wrap(blogs[1]).contains('view').click()
          cy.wrap(blogs[1]).get('.likes').click()
          cy.get('.blogList>div:first').should('contain', 'test1')
        })
      })
    })
  })
})