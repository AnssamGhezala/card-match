// Define first and second cards and initialize to zero
first = 0;
second = 0;

//Define array of won cards and initialize to empty array
wonCards = [];

// This is our Custom Element!
class MyCard extends HTMLElement {
	// Specifies which attributes I want to observe (in case they change)
	static get observedAttributes() {
		return [ 'value', 'id', 'opened' ];
	}

	// Constructor of MyCard: it's basically an onClick listener and the image of the back of a card
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
        <style>
            @import "styles.css"
        </style>
        <div class="card">
            <img src="card.png" alt="Back of card">
        </div>
      `;

		this.addEventListener('click', this.handleClick, true);
	}

	// Method called everytime everytime an observed attribute is added, removed, or changed
	attributeChangedCallback(name, newVal) {
		if (this[name] !== newVal) {
			this[name] = newVal;
		}
	}

	// Helper method to open a card. We check the value of that card and assign its image to its style
	updateStyle(el) {
		const value = el.attributes.value;
		switch (value) {
			case '1':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_1.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '2':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_2.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '3':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_3.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '4':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_4.png" alt="Front of card">
                    </div>
                  `;
				break;
			case 'joker':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="joker.png" alt="Front of card">
                    </div>
                    `;
				break;
		}
	}

	// Helper method to close a card (show its back)
	resetStyle(el) {
		el.shadowRoot.innerHTML = `
        <style>
            @import "styles.css"
        </style>
        <div class="card">
            <img src="card.png" alt="Back of card">
        </div>
      `;
	}

	// This is called as soon as the element is rendered to the page
	connectedCallback() {
		this.opened = this.getAttribute('opened');
		this.value = this.getAttribute('value');
		this.id = this.getAttribute('id');
	}

	// Logic when we click on a card
	handleClick = () => {
		//get the state of the clicked card (if it's opened or not)
		const curr = this.getAttribute('opened');

		//if the card I clicked on was not opened
		if (curr === 'false') {
			//set its opened attribute to true
			const newAttributes = { ...this.attributes, opened: 'true' };
			//check if this the first card I opened
			if (first === 0) {
				//record the first card being opened
				first = newAttributes;
				//set its opened attribute to true
				this.setAttribute('opened', 'true');
				//update its style
				this.updateStyle(this);
			} else {
				//since first !=0, then this must be the second card I open
				second = newAttributes;
				//update its style
				this.updateStyle(this);
				//set its opened attribute to true
				this.setAttribute('opened', 'true');

				//compare first and second cards
				this.compareCards();
			}
			//if the card I clicked on was opened, then first = this card (otherwise wont be opened)
		} else {
			//we check if this opened card is the same as the first opened card, if so, close it
			if (first.id === this.attributes.id) {
				this.setAttribute('opened', 'false');
				this.resetStyle(this);
				first = 0;
			}
		}
	};

	// Getter to get the attributes of the card
	get attributes() {
		return { id: this.id, value: this.value, opened: this.opened };
	}

	// Helper method to compare the first and second cards opened
	compareCards = () => {
		//if the first and second cards I opened have the same value (are equal)
		if (first.value === second.value) {
			//I add them to my wonCards array
			wonCards.push(first, second);

			//I reset first and second
			first = 0;
			second = 0;
		} else {
			//if the second card I opened is not the same as the one I had opened before

			//I close this second card i just opened
			this.setAttribute('opened', 'false');
			this.resetStyle(this);

			//I fetch the first card I had opened and close it
			//I first select the first card from the DOM, I do that by fetching it with its ID
			const selector = 'my-card[id="' + first.id + '"]';
			const firstCardEl = document.querySelectorAll(selector)[0];

			//I close the first selected card by resetting its style
			this.resetStyle(firstCardEl);

			//I make sure to set its "opened" attribute to false (since I just closed it)
			firstCardEl.setAttribute('opened', 'false');

			//I make sure to set first=0 since now I closed the first and second card because they are not equal
			first = 0;
		}
	};
}

//I define my custom element
customElements.define('my-card', MyCard);
