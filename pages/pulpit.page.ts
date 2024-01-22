import {Locator, Page} from "@playwright/test";
import {SideMenuComponent} from "../components/side-menu.component";

export class PulpitPage {
    constructor(private page: Page) {};

    sideMenu = new SideMenuComponent(this.page)

    receiverIdSelect: Locator = this.page.locator('#widget_1_transfer_receiver');
    transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    transferTitleInput = this.page.locator('#widget_1_transfer_title');

    executeButton = this.page.locator('#execute_btn');
    closeButton = this.page.getByTestId('close-button');

    errorMessage = this.page.getByTestId('message-text');

    topUpReceiverSelect = this.page.locator('#widget_1_topup_receiver');
    topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    topUpAgreementCheckbox = this.page.getByLabel('zapoznałem się z regulaminem');

    executePhoneButton = this.page.locator('#execute_phone_btn');
    moneyValueText = this.page.locator('#money_value');

    async executeQuickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
        await this.receiverIdSelect.selectOption(receiverId);
        await this.transferAmountInput.fill(transferAmount);
        await this.transferTitleInput.fill(transferTitle);
        await this.executeButton.click();
        await this.closeButton.click();
    };

    async executeMobileTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
        await this.topUpReceiverSelect.selectOption(topUpReceiver);
        await this.topUpAmountInput.fill(topUpAmount);
        await this.topUpAgreementCheckbox.check();
        await this.executePhoneButton.click()
        await this.closeButton.click();
    }
}