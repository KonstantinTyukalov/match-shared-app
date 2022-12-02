import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ChatActions from '../../store/actions/chat.actions';

import * as ChatSelector from '../../store/selectors/chat.selectors';
import { combineLatest, Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as UserSelector from '../../store/selectors/user.selectors';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../dto/chatMessage.dto';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    public chat$ = this.store.select(ChatSelector.chat);
    public user$ = this.store.select(UserSelector.user);

    public message: string = '';

    private readonly subscriptions: Subscription = new Subscription();

    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly chatService: ChatService
    ) {
    }

    public ngOnInit(): void {
        this.subscriptions.add(
            this.route.params.subscribe((param) => {
                const chatId = param['id'];

                if (chatId) {
                    this.store.dispatch(ChatActions.getChatById({ chatId }));
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onClickSend(): void {
        this.subscriptions.add(
            combineLatest(
                this.chat$,
                this.user$
            ).pipe(take(1)).subscribe(([chat, user]) => {
                this.chatService.sendMessage({
                    chat,
                    sender: user,
                    content: this.message
                } as ChatMessage);

                this.message = '';
            })
        );
    }
}
